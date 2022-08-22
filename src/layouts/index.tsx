import AuthLayout from './AuthLayout';
import ReportLayout from './ReportLayout';
import UserLayout from './ConsoleLayout';
import withLayout from './with-layout';

const withAuthLayout = withLayout(AuthLayout);
const withReportLayout = withLayout(ReportLayout);

export { UserLayout, AuthLayout, withAuthLayout, withReportLayout };
