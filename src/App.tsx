import React from 'react';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import LanguageProvider from './components/LanguageProvider';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {} from './url';
import Landing from './pages/Landing';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apollo';
import { UserLayout } from './layouts';
import { QueryClient, QueryClientProvider } from 'react-query';
import ConsoleLanding from '@/pages/Console/ConsoleLanding';
import ConsoleLayout from '@/layouts/ConsoleLayout/ConsoleLayout';
import ProjectLanding from '@/pages/Project/ProjectLanding';
import ProjectDonation from '@/pages/Project/ProjectDonation';
import ProjectVolunteering from '@/pages/Project/ProjectVolunteering';
import ProjectContact from '@/pages/Project/ProjectContact';
import ProjectLayout from '@/layouts/ProjectLayout';
import ProjectBooking from '@/pages/Project/ProjectBooking';
import ProjectApply from '@/pages/Project/ProjectApply';
import ConsoleDonations from '@/pages/Console/ConsoleDonations';
import ConsoleCustomers from '@/pages/Console/ConsoleCustomers';
import ConsoleAppointments from '@/pages/Console/ConsoleAppointments';
import ConsoleAppointmentDetails from '@/pages/Console/ConsoleAppointmentDetails';
import ConsoleSetup from '@/pages/Console/ConsoleSetup';
import ProjectDonateSuccess from '@/pages/Project/ProjectDonateSuccess';
import { Authenticator } from '@aws-amplify/ui-react';
import icon from './zero-icon.svg'
const queryClient = new QueryClient();

const components = {
  Header() {
    return (
      <div style={{display: 'flex', justifyContent: "center", alignItems: "center", marginTop: 120}}>
        <img alt="Amplify logo" src={icon} style={{width: 160}}/>
      </div>
    );
  },
};

function App() {
  return (
    // <ConfigProvider locale={huHu}>

    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <LanguageProvider>
            <BrowserRouter>
              <Routes>
                <Route
                  path={'/console'}
                  element={
                    <Authenticator signUpAttributes={['email', 'family_name', 'given_name']} components={components}>
                      {({ signOut, user }) => <ConsoleLayout signOut={signOut as any} />}
                    </Authenticator>
                  }
                >
                  {/*<Route index element={<ConsoleLanding />} />*/}
                  <Route path={'setup'} element={<ConsoleSetup />} />
                  <Route path={'donations'} element={<ConsoleDonations />} />
                  <Route path={'customers'} element={<ConsoleCustomers />} />
                  <Route
                    path={'appointments/:appointmentId'}
                    element={<ConsoleAppointmentDetails />}
                  />
                  <Route path={'appointments'} element={<ConsoleAppointments />} />
                  <Route
                    path="/console"
                    element={
                      <Navigate to="/console/customers" />
                    }
                  />
                  <Route
                    path="/console/*"
                    element={
                      <Navigate to="/console/customers" />
                    }
                  />
                </Route>

                <Route path={':slug'} element={<ProjectLayout />}>
                  <Route index element={<ProjectLanding />} />
                  <Route path={'donate/success'} element={<ProjectDonateSuccess />} />
                  <Route path={'donate'} element={<ProjectDonation />} />
                  <Route path={'booking/:bookingId'} element={<ProjectBooking />} />
                  <Route path={'volunteer'} element={<ProjectVolunteering />} />
                  <Route path={'contact'} element={<ProjectContact />} />
                  <Route path={'apply'} element={<ProjectApply />} />

                </Route>
                <Route path={'/'} element={<ProjectLayout />}>
                  <Route index element={<Landing />} />
                </Route>
                <Route
                  path="*"
                  element={
                    <Navigate to="/" />
                  }
                />
              </Routes>
            </BrowserRouter>
          </LanguageProvider>
        </Provider>
      </QueryClientProvider>
    </ApolloProvider>

    // </ConfigProvider>
  );
}

export default App;
