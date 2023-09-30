import {createAuthModal} from './createAuthModal'
import { handlerAuthForm } from './handlerAuthForm'

export function openModalAuth(){

    createAuthModal()
      document.getElementById('auth-form')
     ?.addEventListener('submit', handlerAuthForm, {once:true}) 
} 