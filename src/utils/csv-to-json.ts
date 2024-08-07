export function csvToJson(csv: string): object[] {
  const lines = csv.split('\n');
  const headers = lines[0].split(';').map((header) => header.toLowerCase());
  const result: object[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].split(';');
    if (line.length === headers.length) {
      const obj: any = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j].trim()] = line[j].trim();
      }
      result.push(obj);
    }
  }

  return result;
}
