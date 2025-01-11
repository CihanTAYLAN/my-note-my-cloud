import { createRoot } from 'react-dom/client';
import Layout from './layout';
import '../theme/default/index.css';

const root = createRoot(document.getElementById('app'));

root.render(
    <Layout />
);