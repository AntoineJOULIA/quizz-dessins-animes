export default function AnswerForm() {
  return (
    <form className="grid gap-4">
      <input type="text" placeholder="Votre réponse" />
      <button className="p-4 border border-gray-200">Valider</button>
    </form>
  );
}
