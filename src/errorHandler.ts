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

// handleError
export function handleError(error: unknown, container?: HTMLElement): void {
  
  console.error(error);

  let message = "Something went wrong. Please try again.";

  if(error instanceof ApiRequestError) {
    switch (error.status) {
      case 401: 
        message = "There's a problem with the API key. Please try again later.";
    
        break;
      case 403:
        message = "The monthly tequest limit had been reached. Please try again later";
        break;

      case 404:
        message = "That country couldn't be found.";
        break;
      default: 
        message = "Something went wrong laoding that country. Please try again.";
    
    }
  } else if (error instanceof CountryNotFoundError) {
    message = error.message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  if (container) {
    container.textContent = message;
  }
}


