export async function logPageInfo(page, label = 'PAGE') {
  console.log(`[${label}] URL:`, page.url());
  console.log(`[${label}] TITLE:`, await page.title());
}

export async function logResponse(response, label = 'RESPONSE') {
  console.log(`[${label}] STATUS:`, response.status());
  console.log(`[${label}] URL:`, response.url());
}
