interface PlansConfig {
    [key: string]: {
      quantidade_advogados: number;
      qtde_processos: number;
      tipo_escritorio: string;
    };
  }
  
  export const getPlanData = (plan: string, isPromo: boolean) => {
    const plans: PlansConfig = {
      [isPromo ? "promo1" : "plano1"]: {
        quantidade_advogados: 1,
        qtde_processos: isPromo ? 75 : 50,
        tipo_escritorio: "autonomo",
      },
      [isPromo ? "promo2" : "plano2"]: {
        quantidade_advogados: 3,
        qtde_processos: isPromo ? 100 : 75,
        tipo_escritorio: "admin",
      },
      [isPromo ? "promo3" : "plano3"]: {
        quantidade_advogados: 6,
        qtde_processos: isPromo ? 150 : 100,
        tipo_escritorio: "admin",
      },
    };
  
    return plans[plan];
  };