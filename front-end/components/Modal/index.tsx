import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function Modal() {
  return (
    <Popup
      // trigger={<button className="button"> Open Modal </button>}
      modal
      open
      lockScroll={true}
    >
      <div className="py-5 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-2xl">
            Ola <strong>Gabriel</strong>🖐
          </h1>
          <br />
          <h2>
            Muito obrigado por criar uma conta na <strong>NG Transações</strong>
            .
          </h2>
          <h2>Vai ser uma honra ter você junto com agente.</h2>
        </div>
        <br />
        <div className="text-center">
          <h2>
            É por isso iremos te dar as boas vindas com{" "}
            <strong className="text-green-500">R$ 100,00</strong> iniciais na
            sua conta.
          </h2>
          <h2>
            Para você poder envia com segurança para qualquer usuário que tenha
            uma conta <strong>NG</strong>.
          </h2>
          <h2>Obrigado novamente, e seja bem vindo!</h2>
        </div>
        <br />
        <div>
          <h3>
            <strong>NG Transações</strong>
          </h3>
        </div>
      </div>
    </Popup>
  );
}
