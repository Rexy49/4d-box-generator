// src/App.jsx
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Clipboard, Download, Printer } from "lucide-react";
import combinations from "./data/pick4_combinations.json";

const categories = ["singles", "doubles", "doublePairs", "triples", "quads"];

export default function App() {
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("light");
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const filterCombinations = (list) => {
    return list.filter((num) => num.includes(search));
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(combinations, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "pick4_combinations.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <header className="text-center mb-6 space-y-4">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold">🎲 Pick 4 Combinations Chart</h1>
          <Button variant="ghost" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? <Sun /> : <Moon />}</Button>
        </div>
        <Input
          placeholder="Search for a combination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md mx-auto"
        />
        <div className="flex justify-center gap-4">
          <Button onClick={handleDownload} variant="outline"><Download className="mr-2 w-4 h-4" />Download</Button>
          <Button onClick={handlePrint} variant="outline"><Printer className="mr-2 w-4 h-4" />Print</Button>
        </div>
      </header>

      <Tabs defaultValue="singles" className="max-w-5xl mx-auto">
        <TabsList className="flex flex-wrap justify-center mb-4">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat} className="capitalize">
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat} value={cat}>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
              {filterCombinations(combinations[cat]).map((num) => (
                <Card key={num} className="text-center p-2 cursor-pointer" onClick={() => handleCopy(num)}>
                  <CardContent className="flex flex-col items-center justify-center">
                    <span>{num}</span>
                    {copied === num && <span className="text-xs text-green-500">Copied!</span>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
} 

// src/data/pick4_combinations.json
// <-- Place the downloaded JSON file here -->
