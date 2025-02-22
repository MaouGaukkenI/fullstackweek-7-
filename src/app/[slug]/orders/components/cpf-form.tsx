"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { validateCPF } from "@/helpers/cpf";

const formSchema = z.object({
  cpf: z
    .string()
    .trim()
    .min(1, { message: "O CPF é obrigatório" })
    .length(11, { message: "O CPF deve estar no formato 000.000.000-00" })
    .refine((cpf) => validateCPF(cpf), { message: "CPF inválido" }),
});

type FormSchema = z.infer<typeof formSchema>;

const CpfForm = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(true);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { cpf: "" },
    shouldUnregister: true,
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: FormSchema) => {
    startTransition(async () => {
      router.push(`${pathname}?cpf=${data.cpf}`);
    });
  };

  const handleBack = router.back;
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Visualizar pedidos</DrawerTitle>
          <DrawerDescription>Insira seu CPF para continuar.</DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="px-4">
                  <FormLabel>Seu CPF</FormLabel>
                  <FormControl>
                    <PatternFormat
                      placeholder="Digite seu CPF..."
                      format="###.###.###-##"
                      customInput={Input}
                      value={field.value || ""}
                      onValueChange={(values) => field.onChange(values.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DrawerFooter>
              <Button
                type="submit"
                variant="destructive"
                className="w-full rounded-full"
                disabled={isPending}
              >
                {isPending && <Loader2Icon className="animate-spin" />}
                Confirmar
              </Button>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  className="w-full rounded-full"
                  onClick={handleBack}
                >
                  Cancelar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default CpfForm;
