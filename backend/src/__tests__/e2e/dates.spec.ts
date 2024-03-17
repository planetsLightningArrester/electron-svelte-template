import { test, expect, _electron as electron, type ElectronApplication, type Page } from '@playwright/test'

test.describe.serial('valid dates', () => {
  let electronApp: ElectronApplication
  let window: Page

  test.beforeAll(async () => {
    electronApp = await electron.launch({ args: ['.'] })
    window = await electronApp.firstWindow()
  })

  test.afterAll(async () => {
    await electronApp.close()
  })

  test('change locale to en-us', async () => {
    const enUsButton = window.getByTestId('en-US-button')
    expect(enUsButton).not.toBe(undefined)
    await enUsButton.click()
    expect(await window.getByTestId('main-page-title').innerText()).toBe('Calculate your vacation days')
  })

  test('change dates', async () => {
    const date1Input = window.getByTestId('date1-input')
    await date1Input.waitFor({ state: 'visible', timeout: 2000 })
    await date1Input.fill('2024-01-01')

    const date2Input = window.getByTestId('date2-input')
    await date2Input.waitFor({ state: 'visible', timeout: 2000 })
    await date2Input.fill('2024-01-10')

    const dateResult = window.getByTestId('date-result')
    await expect(dateResult).toHaveText('9 days of vacation')
  })
})
