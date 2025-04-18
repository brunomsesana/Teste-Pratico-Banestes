import Papa from 'papaparse';

export default async function getData<T>(url : string) {
    try {
        const response = await fetch(url);
        if (!response.ok){
        throw new Error(`Response status: ${response.status}`)
        }
        let result = Papa.parse<T>(await response.text(), {
        header: true,
        skipEmptyLines: true
        }).data;
        return result
    } catch (error : any) {
        console.error("Erro ao obter dados: ", error);
        return [];
    }
}