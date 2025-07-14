import { Form } from "../../components/form";

export default function NewTeanPage() {
  return (
    <main>
      <Form type="team" onSubmit={(data) => console.log(data)} />
    </main>
  );
}
