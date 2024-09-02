import styled from "@emotion/styled";

export const Page = styled.div(() => ({
  width: "100vw",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const ButtonWrapper = styled.button((props: any) => {
  let background: string;
  let color: string;

  switch (props.variant) {
    case "PRIMARY":
      background = "#316CF7";
      color = "#FFFFFF";
      break;
    case "SECONDARY":
      background = "#F1F5FF";
      color = "#316CF7";
      break;
    case "DANGER":
      background = "#F3F5FA";
      color = "#E84F34";
      break;
    case "GREEN":
      background = "#05BC70";
      color = "#FFFFFF";
      break;
    default:
      background = "transparent";
      color = "#316CF7";
  }

  if (props.transparent) {
    background = "transparent";
  }

  return `
       width: 100%;
       border: none;
       padding: 16px 16px;
       cursor: pointer;
       display: flex;
       align-items: center;
       justify-content: center;
       border-radius: 8px;
       background-color: ${background};
       font-family: IBMPlexSansRegular, sans-serif;
       font-size: 12px;
       font-style: normal;
       font-weight: 600;
       line-height: 21px;
       text-transform: uppercase;
       color: ${color};
       :disabled {
        opacity: 0.9;
        color: ${props.transparent ? "#BFC8DD" : color};
        background: ${props.transparent ? "transparent" : "#BFC8DD"};
       }
    `;
});
