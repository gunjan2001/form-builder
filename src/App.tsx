import { useEffect, useState } from "react";
import Header from "./components/Header";
import type { FormSchema, Tab } from "./types";
import FormBuilder from "./components/FormBuilder";
import FormRenderer from "./components/FormRenderer";

function App() {
  const [tab, setTab] = useState<Tab>("builder");

  const storedSchema = () => {
    const data = localStorage.getItem("form-schema");
    return data ? JSON.parse(data) : [];
  };
  const [formSchema, setFormSchema] = useState<FormSchema[]>(storedSchema);

  const handleTabChange = (selectedTab: Tab) => {
    setTab(selectedTab);
  };

  // to store schema on every schema change
  useEffect(() => {
    localStorage.setItem("form-schema", JSON.stringify(formSchema));
  }, [formSchema]);

  return (
    <div className="min-h-screen">
      <Header tab={tab} onTabChange={handleTabChange} />
      <main className="mx-auto max-w-3xl px-6 py-8">
        {tab === "builder" ? (
          <FormBuilder
            formSchema={formSchema}
            setFormSchema={setFormSchema}
            onSave={() => setTab("renderer")}
          />
        ) : (
          <FormRenderer schema={formSchema} />
        )}
      </main>
    </div>
  );
}

export default App;
