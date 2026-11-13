import { isDevMode } from '@angular/core';

/**
 * API da plataforma (painel da Laís). Em desenvolvimento aponta para o backend local.
 * Ajuste o endereço de produção quando o backend estiver publicado.
 */
export const PLATFORM_API_URL = isDevMode() ? 'http://localhost:8000/api' : 'https://api.laisbarretoribeiro.com/api';
