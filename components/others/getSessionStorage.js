import { useState, useEffect } from "react";

export default function GetSessionStorage(name) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(sessionStorage.getItem(name));
  }, [name]);

  return value;
}
