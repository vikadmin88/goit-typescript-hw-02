
type Props = {
    msg?: string;
}

const ErrorMessage = ({ msg = "" }: Props) => {
    return (
      <p>
        {msg.length > 0
          ? msg
          : "Whoops, something went wrong! Please try reloading this page!"}
      </p>
    );
  };
  
  export default ErrorMessage;