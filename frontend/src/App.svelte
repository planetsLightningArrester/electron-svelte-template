<script lang="ts">
  import './i18n'
  import { _ } from 'svelte-i18n'
  import Footer from './lib/Footer.svelte'
  import backgroundVideo from './assets/background.mp4'
  import LocaleSwitches from './lib/LocaleSwitches.svelte'

  import { formatDate, resolveImgPath } from './lib/common'
  import { Col, Container, Icon, Input, Row, Styles } from '@sveltestrap/sveltestrap'

  // Set background
  document.body.style.backgroundSize = 'cover'

  // Svelte generates innerHTML assignments breaking CSP "require-trusted-types-for 'script'" in production code
  // https://github.com/sveltejs/svelte/issues/10826
  if (
    'trustedTypes' in window &&
    window.trustedTypes !== null &&
    typeof window.trustedTypes === 'object' &&
    'createPolicy' in window.trustedTypes &&
    window.trustedTypes.createPolicy !== null &&
    window.trustedTypes.createPolicy instanceof Function
  ) {
    window.trustedTypes.createPolicy('default', {
      createHTML: (string: string) => string.replace(/</g, '<').replace(/>/g, '>'),
    })
  }

  $: {
    // Set title
    document.title = $_('main_page.title')
  }

  // Variables
  const today = new Date()
  let date1 = formatDate(today)
  let date2 = date1
  let result = 0

  // Updates
  const checkingForUpdates = false
  let update: Update | undefined
  window.api
    .checkUpdates()
    .then((value) => (update = value))
    .catch((reason) => {
      console.error('Error checking for updates')
      if (reason instanceof Error) console.error(reason.message)
      else console.error(reason)
    })
  const onUpdateApp = async (): Promise<void> => {
    if (typeof update !== 'undefined') window.api.proceedWithUpdate(update)
  }

  /**
   * Handle server response of the request
   * @param response the `
   */
  function handleServerResponse(response: DateDiffServerResponse): void {
    if (typeof response.error !== 'undefined') console.error(response.error)
    else result = response.result
  }

  $: {
    window.api
      .sendDatesToServer(date1, date2)
      .then((response) => {
        handleServerResponse(response)
      })
      .catch((reason) => {
        console.error('Error processing notes')
        if (reason instanceof Error) console.error(reason.message)
        else console.error(reason)
      })
  }
</script>

<Styles />

<main>
  <!-- Background video -->
  <video autoplay muted loop id="background-video">
    <source src={resolveImgPath(backgroundVideo)} type="video/mp4" />
  </video>

  <!-- Title -->
  <Container>
    <div class="container title-container">
      <Row>
        <Col>
          <p data-testid="main-page-title" class="title-text position-relative">
            <b>{$_('main_page.title')}</b>
          </p>
        </Col>
      </Row>
    </div>
  </Container>

  <LocaleSwitches />

  <!-- Input -->
  <div class="container" style="max-width: 250px">
    <Input data-testid="date1-input" theme="dark" type="date" bind:value={date1} placeholder={'01-01-2024'} bsSize="sm" />
    <Input data-testid="date2-input" theme="dark" type="date" bind:value={date2} placeholder={date2} bsSize="sm" />
  </div>

  <Container>
    <Row class="justify-content-center">
      <Col xs="8" style="text-align: center; max-width: 450px">
        <p data-testid="date-result" class="info-result">{result} {$_('main_page.days')}</p>
      </Col>
    </Row>
  </Container>

  {#if update}
    <Container>
      <Row class="justify-content-center">
        <Col xs="8" style="text-align: center; max-width: 350px">
          {#if !checkingForUpdates}
            <button class="info-text info-text-button" on:click={onUpdateApp}>
              {$_('main_page.update')}
              <Icon style="font-size: 15px; color: white; margin-left: 10px" name="download" />
            </button>
          {:else}
            <p class="info-text">{$_('main_page.updating')}</p>
          {/if}
        </Col>
      </Row>
    </Container>
  {/if}

  <!-- Footer -->
  <Footer />
</main>

<style global lang="scss">
  main {
    display: flow-root;
  }

  #background-video {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    z-index: -10;
  }

  .title-container {
    margin-top: 100px;
    user-select: none;
  }

  .title-text {
    font-family: 'Roboto Slab', serif;
    text-align: center;
    color: #d6d6d6;
    font-size: 50px;
    user-select: none;
    text-shadow:
      0 0 6px #000000,
      0 0 10px #000000;
  }

  .info-text {
    font-family: 'Roboto Slab', serif;
    color: #d6d6d680;
    font-size: 15px;
    text-align: center;
    text-decoration: underline;
    user-select: none;
    text-shadow:
      0 0 6px #000000,
      0 0 10px #000000;
    background-color: #0000006b;
    border-radius: 10px;
    margin-top: 10px;
    margin-bottom: 0;
    &-button {
      cursor: pointer;
      border: none;
      background-color: transparent;
    }
  }

  .info-result {
    font-family: 'Roboto Slab', serif;
    color: #d6d6d6;
    font-size: 35px;
    text-align: center;
    user-select: none;
    text-shadow:
      0 0 6px #000000,
      0 0 10px #000000;
    border-radius: 10px;
    margin-top: 10px;
    margin-bottom: 0;
  }

  /* Required to apply to Svelte components */
  :global(.fade-in) {
    animation: fadeIn 1s;
  }

  @keyframes fadIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
