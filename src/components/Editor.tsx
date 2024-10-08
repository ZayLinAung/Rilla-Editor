"use client";

import { useEditorStore } from "@/store";
import { MessageSquareText, NotebookText, ScanText } from "lucide-react";
import { useEffect, useRef } from "react";
import CommentsView from "./CommentsView";
import ScriptsView from "./ScriptView";
import SummaryView from "./SummaryView";

const Editor: React.FC = () => {
  const activeView = useEditorStore((state) => state.activeView);
  const setActiveView = useEditorStore((state) => state.setActiveView);
  const initializeAblyClient = useEditorStore(
    (state) => state.initializeAblyClient,
  );
  const subscribeToAbly = useEditorStore((state) => state.subscribeToAbly);

  const isSubscribed = useRef(false);

  useEffect(() => {
    initializeAblyClient().then(() => {
      if (!isSubscribed.current) {
        subscribeToAbly();
        isSubscribed.current = true;
      }
    });
    subscribeToAbly();
  }, [initializeAblyClient, subscribeToAbly]);

  return (
    <div className="card mx-auto w-full max-w-4xl bg-gray-50 p-4 shadow-xl">
      <h1 className="text-slate-900">Script 1</h1>
      <div className="mt-4 flex w-fit items-center justify-between rounded-full bg-base-200 p-2">
        <button
          className={`btn btn-sm ${activeView === "scripts" ? "btn-neutral" : "btn-ghost"}`}
          onClick={() => setActiveView("scripts")}
        >
          <NotebookText size={24} />
          Script
        </button>
        <button
          className={`btn btn-sm mx-2 ${activeView === "comments" ? "btn-neutral" : "btn-ghost"}`}
          onClick={() => setActiveView("comments")}
        >
          <MessageSquareText size={24} />
          Comments
        </button>
        <button
          className={`btn btn-sm ${activeView === "summary" ? "btn-neutral" : "btn-ghost"}`}
          onClick={() => setActiveView("summary")}
        >
          <ScanText size={24} />
          Summary
        </button>
      </div>
      <div className="container">
        {activeView === "scripts" && <ScriptsView />}
        {activeView === "comments" && <CommentsView />}
        {activeView === "summary" && <SummaryView />}
      </div>
    </div>
  );
};

export default Editor;
