"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type SubmitState = "idle" | "sending" | "success" | "error";

type MemorySubmitFormProps = {
  endpoint: string;
};

export default function MemorySubmitForm({ endpoint }: MemorySubmitFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const previewUrl = useMemo(() => {
    if (!selectedFile) return null;
    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function chooseFile() {
    fileInputRef.current?.click();
  }

  function handleFile(file: File | undefined) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("אפשר לצרף קובץ תמונה בלבד.");
      setSelectedFile(null);
      return;
    }

    setErrorMessage("");
    setSubmitState("idle");
    setSelectedFile(file);
  }

  function removeFile(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!endpoint || endpoint.includes("YOUR_FORM_ID")) {
      setSubmitState("error");
      setErrorMessage("עדיין לא הוגדר קישור Basin אמיתי בקובץ site.ts.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const message = String(formData.get("message") || "").trim();

    if (!message && !selectedFile) {
      setSubmitState("error");
      setErrorMessage("כדאי לכתוב כמה מילים או לצרף תמונה לפני השליחה.");
      return;
    }

    if (selectedFile) {
      formData.set("photo", selectedFile);
    }

    setSubmitState("sending");
    setErrorMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      form.reset();
      setSelectedFile(null);
      setSubmitState("success");
    } catch {
      setSubmitState("error");
      setErrorMessage("משהו השתבש בשליחה. אפשר לנסות שוב בעוד רגע.");
    }
  }

  return (
    <form className="memory-submit-form" onSubmit={handleSubmit}>
      <input
        type="hidden"
        name="_subject"
        value="זיכרון חדש נשלח לאתר של דני"
      />

      <div className="form-field">
        <label htmlFor="name">שם</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="השם שלך"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="relation">הקשר לדני</label>
        <input
          id="relation"
          name="relation"
          type="text"
          placeholder="משפחה, חבר/ה, קולגה, שכן/ה..."
        />
      </div>

      <div className="form-field">
        <label htmlFor="contact">אימייל או טלפון, אם נרצה לשאול משהו</label>
        <input
          id="contact"
          name="contact"
          type="text"
          placeholder="לא חובה"
        />
      </div>

      <div className="form-field">
        <label htmlFor="message">מילים או זיכרון</label>
        <textarea
          id="message"
          name="message"
          rows={7}
          placeholder="אפשר לכתוב כמה מילים, סיפור קצר, משפט שזוכרים ממנו, או כל דבר שתרצו לשתף."
        />
      </div>

      <div className="form-field">
        <label>תמונה, אם רוצים</label>

        <div
          className={`drop-zone ${isDragging ? "is-dragging" : ""}`}
          role="button"
          tabIndex={0}
          onClick={chooseFile}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              chooseFile();
            }
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);
            handleFile(event.dataTransfer.files[0]);
          }}
        >
          {previewUrl ? (
            <div className="upload-preview">
              <img src={previewUrl} alt="תצוגה מקדימה של התמונה שנבחרה" />
              <div>
                <strong>{selectedFile?.name}</strong>
                <span>לחצו כדי לבחור תמונה אחרת</span>
                <button
                  className="remove-file-button"
                  type="button"
                  onClick={removeFile}
                >
                  הסרת התמונה
                </button>
              </div>
            </div>
          ) : (
            <div className="upload-empty">
              <strong>גררו לכאן תמונה</strong>
              <span>או לחצו לבחירה מהמחשב / הטלפון</span>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          className="visually-hidden"
          type="file"
          name="photo"
          accept="image/*"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
      </div>

      <label className="permission-checkbox">
        <input name="permission" type="checkbox" value="yes" required />
        <span>אני מאשר/ת לפרסם באתר הזיכרון את המילים ו/או התמונה ששלחתי.</span>
      </label>

      {submitState === "success" && (
        <div className="form-message success">
          תודה רבה. הזיכרון נשלח ויעבור בדיקה לפני פרסום באתר.
        </div>
      )}

      {submitState === "error" && (
        <div className="form-message error">
          {errorMessage || "משהו השתבש בשליחה."}
        </div>
      )}

      <button
        className="submit-button"
        type="submit"
        disabled={submitState === "sending"}
      >
        {submitState === "sending" ? "שולח..." : "שליחה"}
      </button>
    </form>
  );
}