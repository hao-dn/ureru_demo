import {defineStore} from "pinia";
// import { ElNotification } from "element-plus";
import {Message} from "element-ui";
// import i18n from "@/plugins/i18n";
// import Swal from 'sweetalert2';

export const providerStore = defineStore("provider", {
    state: () => ({
        loader: false
    }),
    getters: {
        getLoader: state => state.loader
    },
    actions: {
        actionLoader(status) {
            this.loader = status;
        },
        showSuccessAlert(message = 'Success') {
            Message({
                message: message.length ? message : "Success",
                type: "success"
            });
        },
        showErrorAlert(message = "Error") {
            Message.error(message);
        },
        showWarningAlert(message = "Alert") {
            Message.warning(message);
        },
        showInfoAlert(message = "Info") {
            Message.info(message);
        }
    }
});
