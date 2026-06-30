import { useState } from "react";
import { TextField } from "../../dist/index.js";

export default function Demo() {
  const [email, setEmail] = useState("");
  const valid = email === "" || /.+@.+\..+/.test(email);
  return (
    <div className="case">
      <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 280 }}>
        <TextField
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helpText={valid ? "We'll never share it." : undefined}
          error={valid ? undefined : "Enter a valid email address."}
          fullWidth
        />
        <TextField label="Disabled" value="Read only" disabled fullWidth />
      </div>
    </div>
  );
}
