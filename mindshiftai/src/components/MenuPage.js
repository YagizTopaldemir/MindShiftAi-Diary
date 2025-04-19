import React from 'react'
import "./Menu.css"
import { useNavigate } from 'react-router-dom'

export default function MenuPage() {
  const navigate = useNavigate()

  const categories = [
    { name: "📖Günlükler", path: "/journals" },
    { name: "⚕️Tavsiyeler", path: "/advice" },
    { name: "🤼‍♂️Motivasyon Yazıları", path: "/motivation" },
    { name: "😇Ruh Analizi", path: "/mood-analysis" },
  ]

  return (
    <div className='Menupage'>
      <div className='navbar-container'>
        <div className='navbar'>
          <div className='navbar-left'>
            <div className='home' onClick={() => navigate('/home')}>🏠<span style={{fontSize:15,fontWeight:600}}>Ana sayfa</span></div>
          </div>
          <div className='navbar-right'></div>
        </div>
      </div>

      <div className="menu-categories">
        <h1>Kategoriler</h1>
        {categories.map((category, index) => (
          <div key={index} className="menu-card" onClick={() => navigate(category.path)}>
            {category.name}
          </div>
        ))}
      </div>
    </div>
  )
}
