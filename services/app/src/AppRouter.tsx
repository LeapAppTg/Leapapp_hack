import { Navigation } from '@elements'
import { GamePage, HomePage, LearningPage, LoaderPage, OnboardingPage, QrCodePage, QuestDetailsPage, QuestsPage, ReferralsPage, SquadsPage, StreakPage } from '@pages'
import { useAuth, useTelegram } from '@providers'
import { FC, PropsWithChildren, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'


type PageWrapperProps = {
    hideNavbar?: boolean
}

const PageWrapper: FC<PropsWithChildren<PageWrapperProps>> = ({children, hideNavbar}) => {
    return (
        <>
        <section className={'content'}>
            {children}
        </section>
        {
            hideNavbar ? null : <Navigation/>
        }
        </>
    )
}

const AppRouter: FC = () => {
    
    const { pathname } = useLocation()
    const { initData, backButton } = useTelegram()
    const { isAuthorized, isFirstTimeLogin } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo({
            behavior: "smooth",
            left: 0,
            top: 0
        })
        if (backButton && ['referrals', 'quests', 'game', 'learning', 'squads'].findIndex(i => pathname.includes(i)) !== -1) {
            backButton.show()
            backButton.on("click", () => {
                navigate('/home')
            })
            return () => backButton.hide()
        }
    }, [pathname])

    if (initData === null) return (
        <>
            <section className='page'>
            <Routes>
                <Route path='/' element={<PageWrapper hideNavbar><QrCodePage/></PageWrapper>}/>
                <Route path='*' element={<Navigate to='/'/>}/>
            </Routes>
            </section>
        </>
    )

    if (!isAuthorized) return (
        <>
            <section className='page'>
            <Routes>
                <Route path='/' element={<PageWrapper hideNavbar><LoaderPage/></PageWrapper>}/>
                <Route path='*' element={<Navigate to='/'/>}/>
            </Routes>
            </section>
        </>
    )

    return (
    <>
      <section className='page'>
        <Routes>
            <Route path='/home' element={<PageWrapper><HomePage/></PageWrapper>}/>
            <Route path='/referrals' element={<PageWrapper><ReferralsPage/></PageWrapper>}/>
            <Route path='/quests' element={<PageWrapper><QuestsPage/></PageWrapper>}/>
            <Route path='/squads' element={<PageWrapper><SquadsPage/></PageWrapper>}/>
            <Route path='/learning' element={<PageWrapper><LearningPage/></PageWrapper>}/>
            <Route path='/quests/:id' element={<PageWrapper><QuestDetailsPage/></PageWrapper>}/>
            <Route path='/streak' element={<PageWrapper hideNavbar><StreakPage/></PageWrapper>}/>
            <Route path='/game' element={<PageWrapper hideNavbar><GamePage/></PageWrapper>}/>
            {
                isFirstTimeLogin
                ?
                <>
                <Route path='/onboarding' element={<PageWrapper hideNavbar><OnboardingPage/></PageWrapper>}/>
                <Route path='*' element={<Navigate to='/onboarding'/>}/>
                </>
                :
                <Route path='*' element={<Navigate to='/streak'/>}/>
            }
        </Routes>
      </section>
    </>
    )
}

export default AppRouter