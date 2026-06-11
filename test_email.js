import { send } from "@emailjs/browser";

(async () => {
    try {
        const res = await send(
          "service_0kza3o8",
          "template_exe20rw",
          {
            to_name: "Test",
            to_email: "test@example.com",
            user_role: "Organizer",
            reply_to: "support@nomad.com", 
          },
          "bp8cytYGh7kJfv0DQ"
        );
        console.log("Success", res);
    } catch(e) {
        console.error("Error", e);
    }
})();
