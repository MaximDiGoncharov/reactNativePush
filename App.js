import { WebView } from 'react-native-webview';
import {useExpoPushToken} from './hooks/expoPushToken';


const App = () => {
   const deviceToken = useExpoPushToken();
   return (
      <WebView
        source={{ uri: `https://universal.laxo.one/enter/${deviceToken ?? null}`  }}
      />
   );
};

export default App;
