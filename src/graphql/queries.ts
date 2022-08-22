/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDonationItemPairs = /* GraphQL */ `
  query GetDonationItemPairs($id: ID!) {
    getDonationItemPairs(id: $id) {
      id
      virtualItemId
      physicalItemId
      createdAt
      updatedAt
    }
  }
`;
export const listDonationItemPairs = /* GraphQL */ `
  query ListDonationItemPairs(
    $filter: ModelDonationItemPairsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDonationItemPairs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        virtualItemId
        physicalItemId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDonorItem = /* GraphQL */ `
  query GetDonorItem($id: ID!) {
    getDonorItem(id: $id) {
      id
      donorCustomerId
      itemId
      date
      createdAt
      updatedAt
    }
  }
`;
export const listDonorItems = /* GraphQL */ `
  query ListDonorItems($filter: ModelDonorItemFilterInput, $limit: Int, $nextToken: String) {
    listDonorItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        donorCustomerId
        itemId
        date
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDonationAppointmentProposal = /* GraphQL */ `
  query GetDonationAppointmentProposal($id: ID!) {
    getDonationAppointmentProposal(id: $id) {
      id
      customerId
      orderId
      serviceId
      appointmentId
      createdAt
      updatedAt
    }
  }
`;
export const listDonationAppointmentProposals = /* GraphQL */ `
  query ListDonationAppointmentProposals(
    $filter: ModelDonationAppointmentProposalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDonationAppointmentProposals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        customerId
        orderId
        serviceId
        appointmentId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getToken = /* GraphQL */ `
  query GetToken($id: ID!) {
    getToken(id: $id) {
      project {
        id
        name
        userId
        slug
        tokens {
          nextToken
        }
        defaultLocationId
        donationCategoryId
        stockCategoryId
        donorCustomerGroupId
        clientCustomerGroupId
        heroTitle
        description
        createdAt
        updatedAt
      }
      accessToken
      refreshToken
      expiresAt
      merchantId
      type
      id
      createdAt
      updatedAt
      projectTokensId
    }
  }
`;
export const listTokens = /* GraphQL */ `
  query ListTokens($filter: ModelTokenFilterInput, $limit: Int, $nextToken: String) {
    listTokens(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        project {
          id
          name
          userId
          slug
          defaultLocationId
          donationCategoryId
          stockCategoryId
          donorCustomerGroupId
          clientCustomerGroupId
          heroTitle
          description
          createdAt
          updatedAt
        }
        accessToken
        refreshToken
        expiresAt
        merchantId
        type
        id
        createdAt
        updatedAt
        projectTokensId
      }
      nextToken
    }
  }
`;
export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      name
      userId
      slug
      tokens {
        items {
          accessToken
          refreshToken
          expiresAt
          merchantId
          type
          id
          createdAt
          updatedAt
          projectTokensId
        }
        nextToken
      }
      defaultLocationId
      donationCategoryId
      stockCategoryId
      donorCustomerGroupId
      clientCustomerGroupId
      heroTitle
      description
      createdAt
      updatedAt
    }
  }
`;
export const listProjects = /* GraphQL */ `
  query ListProjects($filter: ModelProjectFilterInput, $limit: Int, $nextToken: String) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        userId
        slug
        tokens {
          nextToken
        }
        defaultLocationId
        donationCategoryId
        stockCategoryId
        donorCustomerGroupId
        clientCustomerGroupId
        heroTitle
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const pairByVirtualId = /* GraphQL */ `
  query PairByVirtualId(
    $virtualItemId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDonationItemPairsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pairByVirtualId(
      virtualItemId: $virtualItemId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        virtualItemId
        physicalItemId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const pairByPhysicalId = /* GraphQL */ `
  query PairByPhysicalId(
    $physicalItemId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDonationItemPairsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pairByPhysicalId(
      physicalItemId: $physicalItemId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        virtualItemId
        physicalItemId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const proposalByAppointmentId = /* GraphQL */ `
  query ProposalByAppointmentId(
    $appointmentId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDonationAppointmentProposalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    proposalByAppointmentId(
      appointmentId: $appointmentId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        customerId
        orderId
        serviceId
        appointmentId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const projectByUser = /* GraphQL */ `
  query ProjectByUser(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    projectByUser(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        userId
        slug
        tokens {
          items {
            id
            type
            expiresAt
          }
          nextToken
        }
        defaultLocationId
        donationCategoryId
        stockCategoryId
        donorCustomerGroupId
        clientCustomerGroupId
        heroTitle
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const projectBySlug = /* GraphQL */ `
  query ProjectBySlug(
    $slug: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    projectBySlug(
      slug: $slug
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        userId
        slug
        tokens {
          nextToken
        }
        defaultLocationId
        donationCategoryId
        stockCategoryId
        donorCustomerGroupId
        clientCustomerGroupId
        heroTitle
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
