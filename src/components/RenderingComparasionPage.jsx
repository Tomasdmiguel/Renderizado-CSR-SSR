// "use client";

// import { useState, useEffect, useRef } from "react";
// import EventHighlighterClient from "./EventHighlighterClient";
// import EventHighlighterServer from "./EventHighlighterServer";

// export default function RenderingComparisonPage() {
//   const [activeTab, setActiveTab] = useState("comparison");
//   const [csrMetrics, setCsrMetrics] = useState({ startTime: 0, endTime: 0, duration: 0 });
//   const [ssrMetrics, setSsrMetrics] = useState({ startTime: 0, endTime: 0, duration: 0 });
//   const csrRef = useRef(null);
//   const ssrRef = useRef(null);

//   // Función para medir el tiempo de renderizado de CSR
//   const measureCsrRendering = () => {
//     const startTime = performance.now();
//     setCsrMetrics(prev => ({ ...prev, startTime }));
    
//     // Observamos cuando se completa la carga del componente CSR
//     const observer = new MutationObserver((mutations) => {
//       if (csrRef.current && csrRef.current.querySelector(".scrollbar-hide") &&
//           csrRef.current.querySelector(".scrollbar-hide").children.length > 0) {
//         const endTime = performance.now();
//         setCsrMetrics(prev => ({ 
//           ...prev, 
//           endTime, 
//           duration: endTime - prev.startTime 
//         }));
//         observer.disconnect();
//       }
//     });
    
//     if (csrRef.current) {
//       observer.observe(csrRef.current, { 
//         childList: true, 
//         subtree: true 
//       });
//     }
//   };

//   // Función para medir el tiempo de renderizado de SSR
//   const measureSsrRendering = () => {
//     const startTime = performance.now();
//     setSsrMetrics(prev => ({ ...prev, startTime }));
    
//     // Al ser SSR, asumimos que ya está renderizado pero medimos
//     // cualquier hidratación adicional del lado del cliente
//     const observer = new MutationObserver((mutations) => {
//       if (ssrRef.current && ssrRef.current.querySelector(".scrollbar-hide") &&
//           ssrRef.current.querySelector(".scrollbar-hide").children.length > 0) {
//         const endTime = performance.now();
//         setSsrMetrics(prev => ({ 
//           ...prev, 
//           endTime, 
//           duration: endTime - prev.startTime 
//         }));
//         observer.disconnect();
//       }
//     });
    
//     if (ssrRef.current) {
//       observer.observe(ssrRef.current, { 
//         childList: true, 
//         subtree: true 
//       });
//     }
    
//     // SSR ya debería estar renderizado, así que establecemos un tiempo máximo
//     setTimeout(() => {
//       const endTime = performance.now();
//       if (!ssrMetrics.endTime) {
//         setSsrMetrics(prev => ({ 
//           ...prev, 
//           endTime, 
//           duration: endTime - prev.startTime 
//         }));
//       }
//     }, 1000);
//   };

//   useEffect(() => {
//     // Iniciamos las mediciones al cargar la página
//     measureCsrRendering();
//     measureSsrRendering();
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto px-4 pb-16">
//       <h1 className="text-3xl font-bold my-8 text-center text-[#30364C]">
//         Comparación de Renderizado: CSR vs SSR
//       </h1>
      
//       <div className="mb-8">
//         <div className="flex border-b border-gray-200">
//           <button
//             className={`px-4 py-2 font-medium ${
//               activeTab === "comparison" 
//                 ? "border-b-2 border-blue-500 text-blue-600" 
//                 : "text-gray-500"
//             }`}
//             onClick={() => setActiveTab("comparison")}
//           >
//             Comparación Visual
//           </button>
//           <button
//             className={`px-4 py-2 font-medium ${
//               activeTab === "metrics" 
//                 ? "border-b-2 border-blue-500 text-blue-600" 
//                 : "text-gray-500"
//             }`}
//             onClick={() => setActiveTab("metrics")}
//           >
//             Métricas de Rendimiento
//           </button>
//         </div>
//       </div>
      
//       {activeTab === "comparison" ? (
//         <div className="grid md:grid-cols-2 gap-8">
//           <div className="border rounded-lg shadow-lg overflow-hidden">
//             <div className="bg-blue-50 p-4 border-b flex justify-between items-center">
//               <h2 className="text-xl font-bold text-[#30364C]">Client-Side Rendering (CSR)</h2>
//               <div className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800">
//                 Tiempo: {csrMetrics.duration.toFixed(0)} ms
//               </div>
//             </div>
//             <div ref={csrRef} className="relative">
//               <EventHighlighterClient />
              
//               {/* Overlay de carga para CSR */}
//               {csrMetrics.endTime === 0 && (
//                 <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center">
//                   <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//                   <p className="mt-4 text-gray-700 font-medium">Cargando en el cliente...</p>
//                   <div className="mt-2 w-64 h-2 bg-gray-200 rounded-full">
//                     <div className="h-full bg-blue-500 rounded-full animate-pulse"></div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
          
//           <div className="border rounded-lg shadow-lg overflow-hidden">
//             <div className="bg-green-50 p-4 border-b flex justify-between items-center">
//               <h2 className="text-xl font-bold text-[#30364C]">Server-Side Rendering (SSR)</h2>
//               <div className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-800">
//                 Tiempo: {ssrMetrics.duration.toFixed(0)} ms
//               </div>
//             </div>
//             <div ref={ssrRef} className="relative">
//               <EventHighlighterServer />
              
//               {/* Overlay de carga para SSR */}
//               {ssrMetrics.endTime === 0 && (
//                 <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center">
//                   <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
//                   <p className="mt-4 text-gray-700 font-medium">Hidratando desde el servidor...</p>
//                   <div className="mt-2 w-64 h-2 bg-gray-200 rounded-full">
//                     <div className="h-full bg-green-500 rounded-full animate-pulse"></div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <PerformanceMetrics csrMetrics={csrMetrics} ssrMetrics={ssrMetrics} />
//       )}
//     </div>
//   );
// }

// // Componente para mostrar métricas detalladas
// function PerformanceMetrics({ csrMetrics, ssrMetrics }) {
//   // Calculamos la diferencia para la comparación
//   const timeDifference = csrMetrics.duration - ssrMetrics.duration;
//   const percentageDifference = ((timeDifference / csrMetrics.duration) * 100).toFixed(1);
  
//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6">
//       <h2 className="text-2xl font-bold mb-6 text-[#30364C]">Métricas de Renderizado</h2>
      
//       <div className="grid md:grid-cols-2 gap-8 mb-8">
//         <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
//           <h3 className="text-lg font-semibold mb-4 text-blue-800">Client-Side Rendering (CSR)</h3>
          
//           <div className="space-y-4">
//             <div>
//               <p className="text-sm text-gray-600">Tiempo de inicio</p>
//               <p className="text-xl font-medium">{csrMetrics.startTime.toFixed(2)} ms</p>
//             </div>
            
//             <div>
//               <p className="text-sm text-gray-600">Tiempo de finalización</p>
//               <p className="text-xl font-medium">{csrMetrics.endTime.toFixed(2)} ms</p>
//             </div>
            
//             <div className="pt-2 border-t border-blue-200">
//               <p className="text-sm text-gray-600">Tiempo total de renderizado</p>
//               <p className="text-2xl font-bold text-blue-700">{csrMetrics.duration.toFixed(2)} ms</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-green-50 rounded-lg p-4 border border-green-200">
//           <h3 className="text-lg font-semibold mb-4 text-green-800">Server-Side Rendering (SSR)</h3>
          
//           <div className="space-y-4">
//             <div>
//               <p className="text-sm text-gray-600">Tiempo de inicio</p>
//               <p className="text-xl font-medium">{ssrMetrics.startTime.toFixed(2)} ms</p>
//             </div>
            
//             <div>
//               <p className="text-sm text-gray-600">Tiempo de finalización</p>
//               <p className="text-xl font-medium">{ssrMetrics.endTime.toFixed(2)} ms</p>
//             </div>
            
//             <div className="pt-2 border-t border-green-200">
//               <p className="text-sm text-gray-600">Tiempo total de renderizado</p>
//               <p className="text-2xl font-bold text-green-700">{ssrMetrics.duration.toFixed(2)} ms</p>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div className="bg-gray-50 rounded-lg p-6 border">
//         <h3 className="text-lg font-semibold mb-4">Comparación de Rendimiento</h3>
        
//         <div className="mb-6">
//           <div className="flex justify-between mb-2">
//             <span className="text-sm font-medium text-blue-700">CSR</span>
//             <span className="text-sm font-medium text-green-700">SSR</span>
//           </div>
          
//           <div className="h-6 bg-gray-200 rounded-full overflow-hidden relative">
//             <div 
//               className="h-full bg-blue-500 absolute top-0 left-0" 
//               style={{ width: `${(csrMetrics.duration / (csrMetrics.duration + ssrMetrics.duration)) * 100}%` }}
//             ></div>
//             <div 
//               className="h-full bg-green-500 absolute top-0 right-0" 
//               style={{ width: `${(ssrMetrics.duration / (csrMetrics.duration + ssrMetrics.duration)) * 100}%` }}
//             ></div>
//           </div>
//         </div>
        
//         <div className="grid md:grid-cols-2 gap-4">
//           <div className="bg-white p-4 rounded-lg border">
//             <p className="text-sm text-gray-600">Diferencia de tiempo</p>
//             <p className={`text-2xl font-bold ${timeDifference > 0 ? 'text-red-600' : 'text-green-600'}`}>
//               {timeDifference > 0 ? '+' : ''}{timeDifference.toFixed(2)} ms
//             </p>
//             <p className="text-sm text-gray-500 mt-1">
//               SSR es {Math.abs(percentageDifference)}% {timeDifference > 0 ? 'más rápido' : 'más lento'} que CSR
//             </p>
//           </div>
          
//           <div className="bg-white p-4 rounded-lg border">
//             <p className="text-sm text-gray-600">Conclusión</p>
//             {timeDifference > 0 ? (
//               <p className="text-base">
//                 <span className="font-bold text-green-600">SSR muestra mejor rendimiento inicial</span>, ideal para SEO y experiencia de carga rápida.
//               </p>
//             ) : (
//               <p className="text-base">
//                 <span className="font-bold text-blue-600">CSR muestra mejor rendimiento</span>, posiblemente debido a la caché del navegador o condiciones específicas.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
      
//       <div className="bg-gray-50 rounded-lg p-6 border mt-8">
//         <h3 className="text-lg font-semibold mb-4">Recomendaciones</h3>
        
//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <h4 className="font-medium text-[#30364C] mb-2">Usa CSR cuando:</h4>
//             <ul className="list-disc pl-5 space-y-1 text-gray-700">
//               <li>Necesites alta interactividad</li>
//               <li>Desarrolles aplicaciones tipo SPA</li>
//               <li>El SEO no sea una prioridad</li>
//               <li>La aplicación tenga muchas actualizaciones dinámicas</li>
//               <li>Quieras reducir la carga del servidor</li>
//             </ul>
//           </div>
          
//           <div>
//             <h4 className="font-medium text-[#30364C] mb-2">Usa SSR cuando:</h4>
//             <ul className="list-disc pl-5 space-y-1 text-gray-700">
//               <li>El SEO sea fundamental</li>
//               <li>Necesites una carga inicial más rápida</li>
//               <li>La página tenga poco contenido interactivo</li>
//               <li>Trabajes con contenido que cambia con cada solicitud</li>
//               <li>Quieras mejorar el First Contentful Paint (FCP)</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }