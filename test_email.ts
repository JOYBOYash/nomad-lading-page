(async () => {
    try {
        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                service_id: "service_0kza3o8",
                template_id: "template_exe20rw",
                user_id: "bp8cytYGh7kJfv0DQ",
                template_params: {
                    to_name: "Test",
                    to_email: "test@example.com",
                    user_role: "Organizer",
                    reply_to: "support@nomad.com"
                }
            })
        });
        const text = await res.text();
        console.log("Status:", res.status, "Body:", text);
    } catch(e) {
        console.error("Error", e);
    }
})();
