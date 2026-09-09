import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import {supabase} from './supabase.js';

function Auth(){
  const [mode,setMode]=useState('login'); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [name,setName]=useState(''); const [error,setError]=useState(''); const [busy,setBusy]=useState(false);
  async function submit(e){e.preventDefault();setError('');setBusy(true);try{if(mode==='signup'){const {error}=await supabase.auth.signUp({email,password,options:{data:{display_name:name}}});if(error)throw error;setError('Cuenta creada. Revisa tu correo si la confirmación está activada.')}else{const {error}=await supabase.auth.signInWithPassword({email,password});if(error)throw error}}catch(e){setError(e.message||'No se pudo completar la operación.')}finally{setBusy(false)}}
  return <div className="auth"><div className="auth-card"><div className="brand"><b>Z</b><strong>Zancada</strong></div><h1>{mode==='login'?'Bienvenido de nuevo':'Crea tu cuenta'}</h1><p>{mode==='login'?'Accede a tus datos personales.':'Tus pasos y comidas estarán vinculados a tu cuenta.'}</p><form onSubmit={submit}>{mode==='signup'&&<input required placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)}/>}<input required type="email" placeholder="Correo electrónico" value={email} onChange={e=>setEmail(e.target.value)}/><input required minLength="6" type="password" placeholder="Contraseña" value={password} onChange={e=>setPassword(e.target.value)}/><button disabled={busy}>{busy?'Cargando…':mode==='login'?'Entrar':'Crear cuenta'}</button></form>{error&&<div className="auth-error">{error}</div>}<button className="switch" onClick={()=>{setMode(mode==='login'?'signup':'login');setError('')}}>{mode==='login'?'¿No tienes cuenta? Crear una':'¿Ya tienes cuenta? Iniciar sesión'}</button></div></div>
}
function Root(){const [session,setSession]=useState(undefined);useEffect(()=>{supabase.auth.getSession().then(({data})=>setSession(data.session));const {data:{subscription}}=supabase.auth.onAuthStateChange((_e,s)=>setSession(s));return()=>subscription.unsubscribe()},[]);if(session===undefined)return <div className="loading">Cargando Zancada…</div>;return session?<App session={session}/>:<Auth/>}
createRoot(document.getElementById('root')).render(<Root/>);
