export const base_url = "https://accounting65-production.up.railway.app";


export const createToken = (login: string, password: string) => {
    return `Basic ${btoa(`${login}:${password}`)}`;
}