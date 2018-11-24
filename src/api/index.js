const API_ROOT = 'https://api.github.com/users/'


function getMoreRecordsUrl(response) {
    const link = response.headers.get('link')
    if (!link) {
        return null
    }
    const url = link.split(',').find(s => s.indexOf('rel="next"') > -1)
    if (!url) {
        return null
    }
    return url.trim().split(';')[0].slice(1, -1)
}


export const callApi = (username, moreRecordsUrl) => {
    const fullUrl = moreRecordsUrl ? moreRecordsUrl : API_ROOT + username + '/gists';

    return fetch(fullUrl)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    throw response;
                }
                if (!Array.isArray(json)) {
                    throw response;
                }
                var result = {};
                result.data = json.map(x => parseGist(x));
                result.moreRecordsUrl = getMoreRecordsUrl(response);
                return result;
            })
        )
}

const getTags = files => Object.keys(files).map(key => files[key].language).filter(x => x);

const parseGist = (json) => {
    console.log(json);
    let tags = getTags(json.files);
    return {
        id: json.id,
        tags: tags,
        url: json.html_url,
        description: json.description,
        fork_url: json.forks_url,
        user: {
            username: json.owner.login,
            avatar: json.owner.avatar_url,
            userurl: json.owner.html_url
        },
        expanded: false,
        loadingForkData: false,
        errorLoadingFork: false,
        forks: [],
    }
}


export const callForkApi = (fork_url) => {
    const fullUrl = fork_url;

    return fetch(fullUrl)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    throw response;
                }

                if (!Array.isArray(json)) {
                    throw response;
                }
                json.sort((a,b) => (new Date(b.created_at).getTime()) - (new Date(a.created_at).getTime()));
                let ret = json.slice(0, 3).map(x => parseForks(x));
                return ret;
            })
        )
}


const parseForks = (json) => {
    return {
        id: json.id,
        url: json.html_url,
        user: {
            username: json.owner.login,
            avatar: json.owner.avatar_url,
            userurl: json.owner.html_url
        }
    }
}

