// create custom error class, 
export class CountryNotFoundError extends Error {
  constructor(identifier: string) {
    super(`Country not found: ${identifier}`);

    this.name = "CountryNotFoundError";
  }
}

// api reuqest error
export class ApiRequestError extends Error {
  status: number;

  constructor(status: number) {
    super(`API request failed with status ${status}`);
    this.name = "ApiRequestError";
    this.status = status;
  }
}

// // handleError
// export function handleError(error: unknown, container?: HTMLElement): void {
  
  export function getErrorMessage(error: unknown): string {

  console.error(error);

  let message = "Something went wrong. Please try again.";

  if(error instanceof ApiRequestError) {
    switch (error.status) {
      case 401: 
        message = "There's a problem with the API key. Please try again later.";
    
        break;
      case 403:
        message = "The monthly request limit had been reached. Please try again later";
        break;

      case 404:
        message = "That country couldn't be found.";
        break;
      default: 
        message = "Something went wrong laoding that country. Please try again.";
    
    }
  } //check country not found error used
    else if (error instanceof CountryNotFoundError) {
      message = error.message;
  } 
  //check if JavaScript error
  else if (error instanceof Error) {
    message = error.message;
  }

  return message;
}


