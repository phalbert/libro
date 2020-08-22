import { defineComponent } from 'vue';
import App from "./App.vue";
import SettingsProvider from "./contexts/SettingsProvider";

const Root = defineComponent({
    setup() {},
    render() {
        return (
            <SettingsProvider>
                <App />
            </SettingsProvider>
        )
    }
})

export default Root