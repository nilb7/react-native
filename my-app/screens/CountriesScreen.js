// ...existing code...
import React from "react";
import { Component } from "react";
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import data from "../data/countries.json";

const KNOWN_NAME_TO_CODE = {
    "United States": "US",
    "United Kingdom": "GB",
    Canada: "CA",
    France: "FR",
    Germany: "DE",
    Spain: "ES",
    Italy: "IT",
    Japan: "JP",
    China: "CN",
    India: "IN",
    Brazil: "BR",
    Australia: "AU",
};

const ACCENT_COLORS = [
    "#FF6B6B",
    "#4D96FF",
    "#6BFFB3",
    "#FFD56B",
    "#B86BFF",
    "#FF7ACD",
    "#6BCBFF",
    "#9AFF6B",
];

function countryCodeToEmoji(code) {
    if (!code || code.length !== 2) return null;
    const OFFSET = 127397;
    return code
        .toUpperCase()
        .split("")
        .map((c) => String.fromCodePoint(c.charCodeAt(0) + OFFSET))
        .join("");
}

function hashToColor(input) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) hash = input.charCodeAt(i) + ((hash << 5) - hash);
    const idx = Math.abs(hash) % ACCENT_COLORS.length;
    return ACCENT_COLORS[idx];
}

class CountriesScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countries: [],
        };
    }

    componentDidMount() {
        this.setState({
            countries: data,
        });
    }

    getFlagForItem(item) {
        // try explicit codes first
        const possibleCodes = [item.code, item.iso2, item.countryCode, item.iso]
            .filter(Boolean)
            .map((c) => (typeof c === "string" ? c.toUpperCase() : c));

        for (const c of possibleCodes) {
            const emoji = countryCodeToEmoji(c.slice(0, 2));
            if (emoji) return emoji;
        }

        // try mapping by country name
        if (item.country && KNOWN_NAME_TO_CODE[item.country]) {
            return countryCodeToEmoji(KNOWN_NAME_TO_CODE[item.country]);
        }

        // fallback: try derive from country name initial letters -> no reliable emoji
        return null;
    }

    renderItem = ({ item }) => {
        const { name, country, description } = item;
        const flag = this.getFlagForItem(item);
        const bgColor = hashToColor(country || name || "x");
        const initials = (country || name || "")
            .split(" ")
            .map((s) => s.charAt(0))
            .slice(0, 2)
            .join("")
            .toUpperCase();

        return (
            <TouchableOpacity style={[styles.card, { borderLeftColor: bgColor }]} activeOpacity={0.85}>
                <View style={styles.row}>
                    <View style={[styles.flagWrapper, { backgroundColor: bgColor }]}>
                        {flag ? (
                            <Text style={styles.flagEmoji}>{flag}</Text>
                        ) : (
                            <Text style={styles.flagInitials}>{initials}</Text>
                        )}
                    </View>

                    <View style={styles.info}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.city}>{name}</Text>
                            <Text style={styles.country}>{country}</Text>
                        </View>
                        <Text style={styles.description} numberOfLines={3}>
                            {description}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Countries</Text>

                <FlatList
                    data={this.state.countries}
                    keyExtractor={(item) => item.id?.toString() ?? item.name}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f1724", // darker background for contrast
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#fff",
        marginBottom: 14,
    },
    listContent: {
        paddingBottom: 24,
    },
    separator: {
        height: 12,
    },
    card: {
        backgroundColor: "#0b1220",
        borderRadius: 12,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
        borderLeftWidth: 6,
        overflow: "hidden",
    },
    row: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    flagWrapper: {
        width: 56,
        height: 56,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 4,
        elevation: 3,
    },
    flagEmoji: {
        fontSize: 28,
    },
    flagInitials: {
        color: "#071124",
        fontWeight: "700",
        fontSize: 18,
    },
    info: {
        flex: 1,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    city: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
    },
    country: {
        fontSize: 13,
        color: "#cbd5e1",
    },
    description: {
        fontSize: 13,
        color: "#a8b3c7",
        lineHeight: 18,
    },
});

export default CountriesScreen;
// ...existing code...