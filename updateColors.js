import { readFile, writeFile } from 'fs';
import { join } from 'path';

// Função para converter HSL para hexadecimal
function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return `#${Math.round(f(0) * 255)
        .toString(16)
        .padStart(2, '0')}${Math.round(f(8) * 255)
            .toString(16)
            .padStart(2, '0')}${Math.round(f(4) * 255)
                .toString(16)
                .padStart(2, '0')}`;
}

// Caminho para o arquivo CSS
const cssFilePath = join(__dirname, 'src', 'app', 'globals.css');

// Ler o arquivo CSS
readFile(cssFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return;
    }

    // Atualizar os comentários com as cores em formato hexadecimal
    const updatedData = data.replace(
        /(--[\w-]+:\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%)(\s*\/\*.*?\*\/)?/g,
        (match, p1, h, s, l) => {
            const hexColor = hslToHex(parseFloat(h), parseFloat(s), parseFloat(l));
            return `${p1} /* ${hexColor} */`;
        }
    );

    // Escrever o arquivo CSS atualizado
    writeFile(cssFilePath, updatedData, 'utf8', err => {
        if (err) {
            console.error('Erro ao escrever o arquivo:', err);
            return;
        }
        console.log('Arquivo CSS atualizado com sucesso!');
    });
});