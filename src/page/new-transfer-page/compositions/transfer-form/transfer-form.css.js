import { css } from "lit";

export default css`
    .form-container {
        display: grid;
        gap: 0.5rem;
    }
    .field-container {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
        padding: 0.75rem 0.625rem;
        background-color: #fff;
        border-radius: 0.5rem;
    }
    
    .error {
        color: red;
    }

    /*button {
        background-color: #2ea44f;
        border: 1px solid rgba(27, 31, 35, .15);
        border-radius: 0.375rem;
        color: #fff;
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 600;
        height: 2.25rem;
        margin-top: 0.5rem;
        padding: 0.375rem 1rem;
    }*/

    button {
        
      padding: 10px 16px;
      border-radius: 4px;
      background: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      transition: 0.2s;
      margin-top: 0.5rem;

    }

    button:disabled {
        background: #cccccc;
        cursor: not-allowed;
        opacity: 0.7;
    }

`