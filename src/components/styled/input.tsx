import styled from "@emotion/styled";

export const InputWrapper = styled.div((props: any) => {
  return `
      position: relative;
      
      span {
      top: 0;
         color: #E84F34;
         font-size: 10px;
         font-family: IBMPlexSansRegular, sans-serif;
      }
      
      input::placeholder {
        opacity: 0;
      }
    
      input {
        width: 100%;
        font-size: 14px;
        padding: 18px 14px;
        outline: none;
        border: 1px solid ${props.error ? "#E84F34" : "#bfc8dd"};
        box-sizing: border-box;
        border-radius: 16px;
        color: #24272e;
        font-family: IBMPlexSansSemibold, sans-serif;
      }
      
      input[type="date"] {
        position: relative;
        display: inline-block;
        width: 100%;
        min-width: 100%;
        font-size: 14px;
        padding: 0;
        padding-right: 14px;
        box-sizing: border-box;
        outline: none;
        border: 1px solid ${props.error ? "#E84F34" : "#bfc8dd"};
        border-radius: 16px;
        background: #ffffff;
        color: #24272e;
        font-family: IBMPlexSansSemibold, sans-serif;
      }
      
      input[type="date"]::-webkit-datetime-edit {
        box-sizing: border-box;
        line-height: 60px;
        margin: 0 14px;
      }
          
      label {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 14px;
        color: #bfc8dd;
        transition: 0.3s;
        font-family: IBMPlexSansRegular, sans-serif;
      }
    
      input:focus + label,
      input:not(:placeholder-shown) + label {
        top: 0;
        font-size: 10px;
        color: #bfc8dd;
        background: #fff;
        padding: 7px;
      }
    
      input:focus {
        border: 1px solid #bfc8dd;
      }
`;
});
