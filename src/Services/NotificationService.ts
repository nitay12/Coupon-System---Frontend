import { Notyf } from "notyf";

class NotificationService {

    private notify = new Notyf({ duration: 4000, position: { x: "center", y: "top" } });

    public success(message: string): void {
        this.notify.success(message);
    }

    public error(err: any): void {
        const message = this.extractErrorMessage(err);
        this.notify.error(message);
    }

    // Extract original error message:
    private extractErrorMessage(err: any): string {

        // Front: throw "blah...":
        if(typeof err === "string") return err;

        // Axios received an error string from backend:
        if(typeof err.response?.data === "string") return err.response.data;

        // Axios received an error array from backend:
        if(Array.isArray(err.response?.data)) return err.response.data[0];

        // Front: throw new Error("blah..."):
        if(typeof err.message === "string") return err.message; // must check after above axios checks.

        console.log(err); // good thing will be to check this case...

        // Unknown error:
        return "Some error occurred, please try again";
    }

}

const notificationService = new NotificationService();

export default notificationService;
