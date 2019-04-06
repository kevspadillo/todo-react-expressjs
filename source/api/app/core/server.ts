// core/server.ts

import app from "./app";

const PORT = 8091;

app.listen(PORT, () => {
    console.log(`Express server listening on port: ${ PORT }`);
});