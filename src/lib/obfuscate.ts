export function obfuscate(data: any): string {
    return Buffer.from(JSON.stringify(data)).toString('base64');
}

export function deobfuscate(data: string): any {
    return JSON.parse(Buffer.from(data, 'base64').toString());
}
