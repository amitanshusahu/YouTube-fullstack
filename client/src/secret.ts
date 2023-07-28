export let TOKEN : string | null;
export let USERNAME : any;


export function loadSecrets(): void {
  TOKEN = localStorage.getItem('TOKEN');
  USERNAME = localStorage.getItem('USERNAME');
}