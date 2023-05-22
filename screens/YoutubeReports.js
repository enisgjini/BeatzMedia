import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

export default class YoutubeReports extends Component {
    state = {
        reports: [],
    };

    componentDidMount() {
        // Fetch YouTube reports for the logged-in user
        this.fetchReports();
    }

    fetchReports = () => {
        const { username } = this.props;
        fetch(`https://beatz-api-topaz.vercel.app/get-data?username=${username}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.setState({ reports: data.data });
                } else {
                    alert('Unable to fetch reports');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while fetching reports');
            });
    };

    render() {
        const { reports } = this.state;
        const { username } = this.props;
        const uniqueKeys = new Set();

        return (
            <ScrollView style={styles.container}>
                <Text style={styles.title}>YouTube Reports</Text>
                {reports.map(report => {
                    if (uniqueKeys.has(report.id)) {
                        // Skip rendering the card if the key already exists
                        return null;
                    }
                    uniqueKeys.add(report.id);
                    return (
                        <Card key={report.id} containerStyle={styles.card}>
                            <Text style={styles.cardText}>Përshkrimi: {report.emertimi}</Text>
                            <Text style={styles.cardText}>{username}: {report.totali}</Text>
                            <Text style={styles.cardText}>Mbetja: {report.mbetja}</Text>
                            <Text style={styles.cardText}>Totali: {report.totali}</Text>
                            <Text style={styles.cardText}>Data: {report.data}</Text>
                        </Card>
                    );
                })}
            </ScrollView>
        );
    }



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        elevation: 2,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardText: {
        fontSize: 14,
        marginTop: 5,
    },
});
