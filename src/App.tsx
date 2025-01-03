import { ThemeProvider } from '@/components/theme-provider';
import { Layout } from '@/components/layout';
import { Home } from '@/components/home';
import { Profile } from '@/components/profile';
import { Pricing } from '@/components/pricing';
import { ContentCreator } from '@/components/content-creator';
import { ImageResizer } from '@/components/tools/image-resizer';
import { History } from '@/components/history';
import { SignIn } from '@/components/auth/sign-in';
import { SignUp } from '@/components/auth/sign-up';
import { Toaster } from '@/components/ui/sonner';
import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import GuidePage from '@/pages/guide';
import PrivacyPage from '@/pages/privacy';
import TermsPage from '@/pages/terms';
import CookiePage from '@/pages/cookie';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<ContentCreator />} />
            <Route path="/tools/image-resizer" element={<ImageResizer />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/history" element={<History />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/cookie" element={<CookiePage />} />
          </Routes>
        </Layout>
        <Toaster />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;