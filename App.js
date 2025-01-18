import { WebView } from 'react-native-webview';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useExpoPushToken } from './hooks/expoPushToken';

const App = () => {
   const deviceToken = useExpoPushToken();
   return (
      <SafeAreaView style={styles.container}>
         <WebView
            source={{ uri: `https://universal.laxo.one/enter/${deviceToken ?? null}` }}
         />
      </SafeAreaView>

   );
};
const styles = StyleSheet.create({
   container: {
     flex: 1,
     marginTop: 30,
     marginBottom:30, 
     backgroundColor: '#fff', // Задний фон
   },
 });
export default App;