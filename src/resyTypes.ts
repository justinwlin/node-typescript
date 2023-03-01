export type Reservation = {
  template: {
    id: number;
  };
  score: {
    total: number;
  };
  config: {
    id: null | number;
    type: string;
    token: string;
  };
  exclusive: {
    id: number;
  };
  shift: {
    day: string;
    service: {
      type: {
        id: number;
      };
    };
  };
  id: null | number;
  meta: {
    size: {
      assumed: number;
    };
  };
  date: {
    start: string;
    end: string;
  };
  market: {
    date: {
      on: number;
      off: number;
    };
  };
  link: {
    web: string;
    deep_link: string;
  };
  display_config: {
    color: {
      background: null;
      font: null;
    };
  };
  reservation_config: {
    badge: null;
  };
  payment: {
    is_paid: boolean;
    cancellation_fee: null;
    deposit_fee: null;
    service_charge: null;
    venue_share: null;
    payment_structure: null;
    secs_cancel_cut_off: null;
    time_cancel_cut_off: null;
    secs_change_cut_off: null;
    time_change_cut_off: null;
    service_charge_options: any[];
  };
};

export type formattedReservationToDateAndTime = {
  config: {
    id: number | null;
    type: string;
    token: string;
  };
  startdate: string;
  enddate: string;
  startTime: string;
  endTime: string;
};

export type bookTokenReservationDetail = {
  book_token: {
    date_expires: string;
    value: string;
  };
  cancellation: {
    credit: {
      date_cut_off: null;
    };
    display: {
      policy: string[];
    };
    fee: {
      amount: number;
      display: {
        amount: string;
      };
      date_cut_off: string;
    };
    refund: {
      date_cut_off: string;
    };
  };
  change: {
    date_cut_off: string;
  };
  config: {
    add_ons: {
      amount: number;
      name: string;
      id: string;
      option: string;
    }[];
    double_confirmation: string[];
    features: string[];
    menu_items: string[];
    service_charge_options: {
      amount: string;
      display: string;
      is_default: 1;
    }[];
  };
  locale: {
    currency: string;
  };
  payment: {
    amounts: {
      add_ons: number;
      price_per_unit: number;
      quantity: number;
      resy_fee: number;
      service_charge: {
        amount: number;
        value: string;
      };
      surcharge: number;
      tax: number;
      total: number;
    };
    comp: number;
    config: {
      type: string;
    };
    display: {
      balance: {
        modifier: string;
        value: string;
      };
      buy: {
        action: string;
        after_modifier: string;
        before_modifier: string;
        init: string;
        value: string;
      };
      description: string[];
    };
  };
  user: {
    payment_methods: {
      display: string;
      id: number;
      is_default: boolean;
      provider_id: number;
      provider_name: string;
    }[];
  };
  venue: {
    config: {
      allow_bypass_payment_method: number;
      allow_multiple_resys: number;
      enable_invite: number;
      enable_resypay: number;
      hospitality_included: number;
    };
    content: {
      attribution: string;
      body: string;
      display: {
        type: string;
      };
      icon: {
        url: string;
      };
      name: string;
      title: string;
    }[];
    location: {
      address_1: string;
      address_2: null;
      country: string;
      cross_street_1: string;
      cross_street_2: string;
      id: number;
      latitude: number;
      locality: string;
      longitude: number;
      neighborhood: string;
      postal_code: string;
      region: string;
    };
    rater: {
      name: string;
      scale: number;
      score: number;
      total: number;
    }[];
    source: {
      name: string;
      logo: string;
      privacy_policy: string;
      terms_of_service: string;
    };
  };
  viewers: {
    total: number;
  };
};
