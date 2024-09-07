import { AlertsConsumer, AlertsProvider, AuthConsumer, AuthProvider, BottomPopupConsumer, BottomPopupProvider, TelegramConsumer, TelegramProvider } from '@providers';
import '@styles';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import { useEffect } from 'react';
import { SvgSharedColors } from '@components';
import mixpanel from 'mixpanel-browser';
import { MIXPANEL_TOKEN } from '@constants';

function App() {

  useEffect(() => {
    const tgEmojis = ["folder", "color_palette", "nerd", "arm", "leg", "dance", "cup", "handwave", "bomb", "books", "champange_glasses", "lightning", "megaphone", "money_bag", "rocket", "rollercoaster", "time"]
    const gameItems = ["durov", "bomb", "dollar", "frog", "gold", "hero_blown", "hero_open_magnet", "hero_open", "hero_swallow_magnet", "hero_swallow", "hero_thug", "magnet", "rocket", "slider", "ufo"]
    const bgs = ["dots", "tiles_dark", "dots_light", "triad_space"]

    const paths = [
      ...tgEmojis.map(e => `/tg-emojis/${e}.svg`),
      ...gameItems.map(e => `/game-items/${e}.svg`),
      ...bgs.map(e => `/backgrounds/${e}.svg`)
    ]

    for (let path of paths) {
      new Image().src = path
    }
  }, [])

  useEffect(() => {
    mixpanel.init(MIXPANEL_TOKEN, {
      track_pageview: 'url-with-path'
    })
  }, [])

  return (
    <BrowserRouter>
      <TelegramProvider>
        <AuthProvider>
          <AlertsProvider>
            <BottomPopupProvider>
              <AlertsConsumer/>
              <AppRouter/>
              <TelegramConsumer/>
              <AuthConsumer/>
              <BottomPopupConsumer/>
              <SvgSharedColors/>
            </BottomPopupProvider>
          </AlertsProvider>
        </AuthProvider>
      </TelegramProvider>
    </BrowserRouter>
  )
}

export default App