import { Navigation } from '@elements'
import { HomePage, OnboardingPage, QuestDetailsPage, QuestsPage, ReferralsPage, StreakPage } from '@pages'
import { FC, PropsWithChildren, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'


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

    useEffect(() => {
        window.scrollTo({
            behavior: "smooth",
            left: 0,
            top: 0
        })
    }, [pathname])

    return (
    <>
      <section className='page'>
        <Routes>
            <Route path='/home' element={<PageWrapper><HomePage/></PageWrapper>}/>
            <Route path='/referrals' element={<PageWrapper><ReferralsPage/></PageWrapper>}/>
            <Route path='/quests' element={<PageWrapper><QuestsPage/></PageWrapper>}/>
            <Route path='/quests/:id' element={<PageWrapper><QuestDetailsPage/></PageWrapper>}/>
            <Route path='/onboarding' element={<PageWrapper hideNavbar><OnboardingPage/></PageWrapper>}/>
            <Route path='/streak' element={<PageWrapper hideNavbar><StreakPage/></PageWrapper>}/>
            <Route path='*' element={<Navigate to='/onboarding'/>}/>
        </Routes>
      </section>
    </>
    )
}

export default AppRouter