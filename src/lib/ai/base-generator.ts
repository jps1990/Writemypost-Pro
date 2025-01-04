import { OpenAI } from 'openai';
import { sleep } from '../utils';

/**
 * Classe de base pour les générateurs de contenu
 * Fournit des fonctionnalités communes comme:
 * - Gestion des retries avec backoff exponentiel
 * - Nettoyage et validation JSON
 * - Gestion des erreurs OpenAI
 */
export abstract class BaseGenerator {
  protected maxRetries = 3;
  protected initialRetryDelay = 1000; // 1 seconde

  protected getClient() {
    return new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
  }

  protected async retryWithExponentialBackoff<T>(
    operation: () => Promise<T>,
    context: string
  ): Promise<T> {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error: any) {
        lastError = error;
        console.error(`Erreur dans ${context} (tentative ${attempt + 1}/${this.maxRetries}):`, error);

        // Gestion spécifique des erreurs OpenAI
        if (error?.response?.status === 429) {
          console.log('Rate limit atteint, pause plus longue...');
          await sleep(this.initialRetryDelay * Math.pow(2, attempt) * 2); // Double le délai pour rate limit
        } else if (error?.response?.status >= 500) {
          console.log('Erreur serveur OpenAI, on réessaie...');
          await sleep(this.initialRetryDelay * Math.pow(2, attempt));
        } else if (error?.response?.status === 400) {
          // Erreur de validation ou de prompt
          console.error('Erreur de validation:', error?.response?.data);
          throw error; // On ne retry pas les erreurs de validation
        } else {
          // Autres erreurs HTTP
          await sleep(this.initialRetryDelay * Math.pow(2, attempt));
        }
      }
    }

    throw lastError || new Error(`Échec après ${this.maxRetries} tentatives`);
  }

  protected async cleanAndValidateJson(jsonString: string, context: string): Promise<any> {
    try {
      // Enlever tout texte avant le premier { et après le dernier }
      const startIndex = jsonString.indexOf('{');
      const endIndex = jsonString.lastIndexOf('}');
      
      if (startIndex === -1 || endIndex === -1) {
        throw new Error('Structure JSON invalide - accolades manquantes');
      }

      const cleaned = jsonString.slice(startIndex, endIndex + 1);
      
      try {
        return JSON.parse(cleaned);
      } catch (parseError) {
        console.error(`Erreur de parsing JSON dans ${context}:`, parseError);
        console.error('Contenu problématique:', cleaned);
        
        // Tentative de réparation basique
        const repaired = cleaned
          .replace(/,\s*([\]}])/g, '$1') // Enlève les virgules trailing
          .replace(/([{,]\s*)([a-zA-Z0-9_]+)(\s*:)/g, '$1"$2"$3'); // Ajoute des guillemets aux clés
          
        return JSON.parse(repaired);
      }
    } catch (error) {
      console.error(`Échec du nettoyage/validation JSON dans ${context}:`, error);
      throw error;
    }
  }

  /**
   * Méthode abstraite que chaque générateur doit implémenter
   * pour générer son contenu spécifique
   */
  abstract generate(analysis: any, options: any): Promise<any>;
} 