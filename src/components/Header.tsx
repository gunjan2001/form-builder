import type { Tab } from "../types";

interface IHeader {
  tab: Tab;
  onTabChange: (selectedTab: Tab) => void;
}

const Header: React.FC<IHeader> = ({ tab, onTabChange }) => {
  const tabsArr = ["builder", "renderer"];

  return (
    <>
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-5">
          <h1 className="text-lg font-semibold tracking-tight">Form Builder</h1>
          <p className="text-sm text-neutral-500">
            Build forms that work beautifully for every purpose.
          </p>
          {/* We have to create two button one for builder and second one is for renderer */}
          <div className="bg-neutral-100 inline-flex rounded-lg p-1 mt-4">
            {(tabsArr as Tab[]).map((t) => (
              <button
                type="button"
                className={`px-2 py-1 rounded ${t === tab ? "bg-neutral-300" : "bg-neutral-100"} `}
                key={t}
                onClick={() => onTabChange(t)}
              >
                {t === "builder" ? "Builder" : "Renderer"}
              </button>
            ))}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
