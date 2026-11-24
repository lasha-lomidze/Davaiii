import app from "./src/server";
import env from "./src/config/env";

const port = env.PORT || 8000;

app.listen(port, () => {
    console.log(`Better Auth app listening on port ${port}`);
});
